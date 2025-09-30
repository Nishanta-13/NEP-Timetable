from ortools.sat.python import cp_model
import csv
from collections import defaultdict

# --------------------------- Demo data ---------------------------
DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
SLOTS = ["9-10","10-11","11-12","13-14","14-15","15-16"]  # 1-hour slots
ROOMS = [
    {"id": "R1", "capacity": 120},
    {"id": "R2", "capacity": 60},
    {"id": "R3", "capacity": 40},
    {"id": "R4", "capacity": 30},
]
STUDENT_GROUPS = {
    "G1": 50,
    "G2": 40,
    "G3": 30,
}
COURSES = [
    {"id": "Math", "prof": "P1", "groups": ["G1", "G2"], "sessions_per_week": 4},
    {"id": "Physics", "prof": "P2", "groups": ["G1"], "sessions_per_week": 3},
    {"id": "Chem", "prof": "P3", "groups": ["G2", "G3"], "sessions_per_week": 3},
    {"id": "CS", "prof": "P4", "groups": ["G1", "G2", "G3"], "sessions_per_week": 5},
    {"id": "Eng", "prof": "P5", "groups": ["G3"], "sessions_per_week": 2},
    # --- New subjects added ---
    {"id": "Bio", "prof": "P6", "groups": ["G1", "G2"], "sessions_per_week": 3},
    {"id": "History", "prof": "P7", "groups": ["G2", "G3"], "sessions_per_week": 3},
]
PROFESSORS = list({c['prof'] for c in COURSES})

# Slot weights for preference
SLOT_WEIGHTS = {
    "9-10": 2,
    "10-11": 5,  # highest preference
    "11-12": 3,
    "13-14": 1,
    "14-15": 1,
    "15-16": 1
}

# Utility
course_map = {c['id']: c for c in COURSES}
R = [r['id'] for r in ROOMS]
C = [c['id'] for c in COURSES]
ALLOWED_ROOMS = {
    c['id']: [r['id'] for r in ROOMS if sum(STUDENT_GROUPS[g] for g in c['groups']) <= r['capacity']]
    for c in COURSES
}

# --------------------------- Model ---------------------------
def build_and_solve():
    model = cp_model.CpModel()
    x = {}
    for c in C:
        for d in range(len(DAYS)):
            for t in range(len(SLOTS)):
                for r in R:
                    if r in ALLOWED_ROOMS[c]:
                        x[(c,d,t,r)] = model.NewBoolVar(f"x_{c}_{d}_{t}_{r}")

    # Each course gets its required sessions
    for c in C:
        req = course_map[c]['sessions_per_week']
        model.Add(sum(x[(c,d,t,r)] for d in range(len(DAYS)) for t in range(len(SLOTS)) for r in R if (c,d,t,r) in x) == req)

    # Room conflict: one course per room per slot
    for d in range(len(DAYS)):
        for t in range(len(SLOTS)):
            for r in R:
                vars_here = [x[(c,d,t,r)] for c in C if (c,d,t,r) in x]
                if vars_here:
                    model.Add(sum(vars_here) <= 1)

    # Professor conflict: one course per professor per slot across all rooms
    prof_courses = defaultdict(list)
    for c in C:
        prof_courses[course_map[c]['prof']].append(c)
    for p, clist in prof_courses.items():
        for d in range(len(DAYS)):
            for t in range(len(SLOTS)):
                vars_here = [x[(c,d,t,r)] for c in clist for r in R if (c,d,t,r) in x]
                if vars_here:
                    model.Add(sum(vars_here) <= 1)

    # Student group conflict: one course per group per slot across all rooms
    for g in STUDENT_GROUPS:
        c_for_g = [c for c in C if g in course_map[c]['groups']]
        for d in range(len(DAYS)):
            for t in range(len(SLOTS)):
                vars_here = [x[(c,d,t,r)] for c in c_for_g for r in R if (c,d,t,r) in x]
                if vars_here:
                    model.Add(sum(vars_here) <= 1)

    # Optional: spread classes of same course across week (avoid consecutive days)
    for c in C:
        for d in range(len(DAYS)-1):
            vars_today = [x[(c,d,t,r)] for t in range(len(SLOTS)) for r in R if (c,d,t,r) in x]
            vars_next = [x[(c,d+1,t,r)] for t in range(len(SLOTS)) for r in R if (c,d+1,t,r) in x]
            if vars_today and vars_next:
                model.Add(sum(vars_today) + sum(vars_next) <= course_map[c]['sessions_per_week'])

    # Objective: maximize slot preference
    model.Maximize(sum(x[(c,d,t,r)] * SLOT_WEIGHTS[SLOTS[t]] for c in C for d in range(len(DAYS)) for t in range(len(SLOTS)) for r in R if (c,d,t,r) in x))

    # Solve
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 30
    solver.parameters.num_search_workers = 8

    print("Solving...")
    status = solver.Solve(model)

    if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
        # Student timetable CSV
        with open('student_timetable.csv', 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(["Day", "Slot", "Room", "Course", "Prof", "Groups"])
            for d in range(len(DAYS)):
                for t in range(len(SLOTS)):
                    for r in R:
                        for c in C:
                            if (c,d,t,r) in x and solver.Value(x[(c,d,t,r)]) == 1:
                                writer.writerow([DAYS[d], SLOTS[t], r, c, course_map[c]['prof'], ','.join(course_map[c]['groups'])])

        # Teacher timetable CSV
        with open('teacher_timetable.csv','w',newline='') as f:
            writer = csv.writer(f)
            for p in PROFESSORS:
                writer.writerow([p])
                writer.writerow(["Day", "Slot", "Room", "Course", "Groups"])
                for d in range(len(DAYS)):
                    for t in range(len(SLOTS)):
                        for r in R:
                            for c in C:
                                if course_map[c]['prof']==p and (c,d,t,r) in x and solver.Value(x[(c,d,t,r)])==1:
                                    writer.writerow([DAYS[d], SLOTS[t], r, c, ','.join(course_map[c]['groups'])])
                writer.writerow([])

        print("✔ Student and Teacher timetables generated.")
    else:
        print("❌ No feasible solution found.")

if __name__=='__main__':
    build_and_solve()
