# Admin-CHW Alignment Gap Analysis

## Purpose
This document analyzes all Admin pages and all CHW pages in the current codebase, identifies oversight gaps, and defines how to align CHW operational work so Admin can fully supervise CHW execution.

A key requirement is implemented in this analysis:
- Tasks and Home Visits should be categorized together under Admin CHW Assignments.

## Scope Reviewed

### Routes
- `src/routes/adminRoutes.jsx`
- `src/routes/chwRoutes.jsx`

### Admin Pages (routed)
- `src/Pages/Admin/AdminDashboard_Optimized.jsx`
- `src/Pages/Admin/AdminProfile.jsx`
- `src/Pages/Admin/ActivePatients.jsx`
- `src/Pages/Admin/ActiveCHW.jsx`
- `src/Pages/Admin/AmbulanceManagement.jsx`
- `src/Pages/Admin/ApproveRequests.jsx`
- `src/Pages/Admin/AdminAppointments.jsx`
- `src/Pages/Admin/SystemLogs.jsx`
- `src/Pages/Admin/UserManagement.jsx`
- `src/Pages/Admin/SystemSettings.jsx`
- `src/Pages/Admin/FinancialManagement.jsx`
- `src/Pages/Admin/TelemedicineManagement.jsx`
- `src/Pages/Admin/TrainingManagement.jsx`
- `src/Pages/Admin/InsuranceManagement.jsx`
- `src/Pages/Admin/NotificationManagement.jsx`
- `src/Pages/Admin/ReportsAnalytics.jsx`
- `src/Pages/Admin/HospitalManagement.jsx`
- `src/Pages/Admin/CHWAssignments.jsx`

### CHW Pages (routed)
- `src/Pages/Client/CHW/CHWDashboard.jsx`
- `src/Pages/Client/CHW/MyPatients.jsx`
- `src/Pages/Client/CHW/CHWAppointments.jsx`
- `src/Pages/Client/CHW/HomeVisits.jsx`
- `src/Pages/Client/CHW/TasksFollowups.jsx`
- `src/Pages/Client/CHW/HealthAssessments.jsx`
- `src/Pages/Client/CHW/CHWMessages.jsx`
- `src/Pages/Client/CHW/ReportsAnalytics.jsx`
- `src/Pages/Client/CHW/ResourcesTraining.jsx`
- `src/Pages/Client/CHW/CHWProfile.jsx`
- `src/Pages/Client/CHW/CHWSettings.jsx`

### Navigation/Layouts checked for reachability
- `src/Layouts/AdminLayout.jsx`
- `src/Layouts/CHWLayout.jsx`
- `src/Components/Admin/AdminSidebar.jsx`
- `src/Components/CHWSidebar.jsx`

---

## Executive Summary

Admin currently has broad system-level modules, but CHW operational execution is fragmented in CHW-only pages and not fully visible in Admin. The highest-risk oversight gaps are:
1. No Admin monitoring workflow for CHW Home Visits.
2. No Admin monitoring workflow for CHW Tasks/Follow-ups.
3. No structured linkage between CHW Assignments and the actual work items that prove assignment progress.

Result: Admin can assign CHWs, but cannot reliably audit or enforce what CHWs do after assignment.

---

## CHW-to-Admin Parity Matrix

| CHW Page | Admin Oversight Equivalent | Oversight Status | Gap Level |
|---|---|---|---|
| CHWDashboard | AdminDashboard_Optimized | Partial aggregate visibility; no robust CHW operational drilldowns by assignment work item | Medium |
| MyPatients | ActivePatients | Strong parity on patient listing and status visibility | Low |
| CHWAppointments | AdminAppointments | Good parity for appointment lifecycle | Low |
| HomeVisits | None (direct equivalent missing) | CHW can schedule/complete/reschedule visits without Admin operations board | High |
| TasksFollowups | None (direct equivalent missing) | CHW can create/start/complete tasks with no Admin task governance | High |
| HealthAssessments | None (direct equivalent missing) | CHW records clinically meaningful metrics not operationalized into Admin oversight flow | High |
| CHWMessages | NotificationManagement (not equivalent) | CHW-patient thread context not mapped to Admin escalation workflows | Medium |
| ReportsAnalytics (CHW) | ReportsAnalytics (Admin) | Both exist, but not unified for CHW performance governance by assignment unit | Medium |
| ResourcesTraining | TrainingManagement | Functional conceptual alignment exists | Low |
| CHWProfile | ActiveCHW/UserManagement | Partial visibility; assignment intelligence not consistently tied to profile constraints | Medium |
| CHWSettings | SystemSettings (system-wide, not CHW policy governance) | CHW can toggle accountability-sensitive settings without Admin policy lock | Medium |

---

## Key Gaps (What Must Improve)

## 1) CHW Assignments is not the operational source of truth (High)
File: `src/Pages/Admin/CHWAssignments.jsx`

Observed:
- Assignment objects include status and visit frequency fields, but there is no linked work-item timeline from CHW execution pages.
- Assignment status can change without evidence linkage to completed tasks/home visits.

Risk:
- Admin cannot prove assignment fulfillment quality.

Needed improvement:
- Make CHW Assignments the parent container for CHW operational work items.

## 2) Home Visit workflow is CHW-only (High)
File: `src/Pages/Client/CHW/HomeVisits.jsx`

Observed:
- CHW page supports upcoming/completed/cancelled visits and direct completion/rescheduling actions.
- No corresponding Admin board for live oversight and intervention.

Risk:
- Missed urgent visits can remain invisible at Admin level.

Needed improvement:
- Home Visits must be visible and manageable in Admin under CHW Assignments.

## 3) Tasks workflow is CHW-only (High)
File: `src/Pages/Client/CHW/TasksFollowups.jsx`

Observed:
- CHW can create/edit/start/complete tasks across pending/inProgress/completed.
- No Admin queue for overdue/escalated task governance.

Risk:
- No control loop for task timeliness or priority handling.

Needed improvement:
- Tasks must be visible and governable in Admin under CHW Assignments.

## 4) Health assessments are not in Admin supervision path (High)
File: `src/Pages/Client/CHW/HealthAssessments.jsx`

Observed:
- CHW captures risk-relevant metrics (blood pressure, glucose, BMI, hemoglobin, etc.).
- No dedicated Admin oversight module tied to CHW assignment execution.

Risk:
- Clinical risk events can be detected by CHW but not systemically escalated to Admin oversight workflows.

Needed improvement:
- Surface assessment-linked alerts in CHW Assignments when tied to assignment work.

## 5) Navigation parity issues hide existing capabilities (Medium)
Files:
- `src/Components/Admin/AdminSidebar.jsx`
- `src/Components/CHWSidebar.jsx`

Observed:
- Admin sidebar comments out available routes (for example, approve requests, reports, notifications).
- CHW sidebar comments out existing routes (`health-assessments`, `messages`) while routes exist in `src/routes/chwRoutes.jsx`.

Risk:
- Functional pages exist but are not discoverable in role navigation.

Needed improvement:
- Restore route discoverability as part of governance UX cleanup.

## 6) CHW profile/qualification constraints are not strongly bound to assignment rules (Medium)
Files:
- `src/Pages/Client/CHW/CHWProfile.jsx`
- `src/Pages/Admin/CHWAssignments.jsx`
- `src/Pages/Admin/ActiveCHW.jsx`

Observed:
- CHW profile includes specialization/coverage/supervisor attributes.
- Assignment page does not enforce those constraints in observable logic.

Risk:
- Assignment quality can drift due to non-enforced qualification matching.

Needed improvement:
- Add assignment validation rules (specialization/region/availability fit).

## 7) CHW settings include accountability-sensitive toggles without admin policy lock (Medium)
File: `src/Pages/Client/CHW/CHWSettings.jsx`

Observed:
- CHW controls settings such as GPS tracking, auto-check-in, auto-sync, share performance.
- No explicit Admin-side CHW policy manager in current reviewed pages.

Risk:
- Field accountability and reporting consistency can be weakened by local preference choices.

Needed improvement:
- Add policy-level enforcement in Admin scope and push immutable baseline rules to CHW app.

---

## Alignment Design: Put Tasks and Home Visits under CHW Assignments

## Target model
- Admin CHW Assignments should become the governance hub.
- Every CHW operational action should belong to an assignment work item.
- Work item categories under CHW Assignments:
  - TASK
  - HOME_VISIT

## Proposed data model (minimum)

### CHWAssignment (parent)
- assignmentId
- patientId
- chwId
- assignmentStatus: ASSIGNED | IN_PROGRESS | COMPLETED | CANCELED
- priority
- startDate
- targetEndDate
- nextVisit
- escalationFlag

### CHWAssignmentWorkItem (child)
- workItemId
- assignmentId
- workType: TASK | HOME_VISIT
- title
- category
- priority: NORMAL | HIGH | URGENT
- status: PENDING | IN_PROGRESS | COMPLETED | OVERDUE | ESCALATED
- scheduledDateTime
- dueDateTime
- completionDateTime
- location (for home visit)
- coordinates (optional)
- notes
- createdBy
- updatedBy

## Category mapping required by your request
- Existing CHW Tasks items map to `workType = TASK` under CHW Assignments
- Existing CHW Home Visits items map to `workType = HOME_VISIT` under CHW Assignments
- Both appear in one Admin CHW Assignments operational view with filters

## Required Admin CHW Assignments UI changes
In `src/Pages/Admin/CHWAssignments.jsx`:
1. Add tabs/subviews:
- Overview
- Work Items (All)
- Tasks
- Home Visits
- Escalations

2. Add filters:
- CHW
- Patient
- Work Type (TASK/HOME_VISIT)
- Priority
- Status
- Date range

3. Add table columns for work items:
- Assignment ID
- Work Item ID
- Work Type
- CHW
- Patient
- Due/Scheduled date
- Status
- Priority
- Last update

4. Add enforced transitions:
- Assignment cannot move to COMPLETED if open/overdue work items exist
- URGENT overdue items auto-escalate

---

## Admin Page-by-Page Relevance to CHW Oversight

| Admin Page | CHW Oversight Relevance | Note |
|---|---|---|
| AdminDashboard_Optimized | Partial | Should include CHW assignment-work KPIs, not only global stats |
| AdminProfile | Low | Administrative identity, not CHW workflow control |
| ActivePatients | Medium | Provides patient context, but not assignment execution evidence |
| ActiveCHW | Medium | CHW roster and performance indicators exist; needs tighter coupling to live assignment work |
| AmbulanceManagement | Low | Adjacent emergency ops; indirectly relevant for escalations |
| ApproveRequests | Medium | Could be extended for CHW work-item approvals |
| AdminAppointments | Medium | Appointment oversight exists; should be linked when appointments derive from CHW assignment work |
| SystemLogs | Medium | Critical for auditability once work-item events are logged |
| UserManagement | Medium | Role governance exists; should enforce CHW oversight permissions explicitly |
| SystemSettings | Medium | Add CHW field policy controls (GPS/sync/etc.) |
| FinancialManagement | Low | Can consume CHW productivity signals later |
| TelemedicineManagement | Low/Medium | Relevant where CHW escalates to virtual care |
| TrainingManagement | Medium | Should feed assignment eligibility via certification constraints |
| InsuranceManagement | Low | Downstream claims context |
| NotificationManagement | Medium | Should subscribe to CHW assignment events/overdues/escalations |
| ReportsAnalytics | High | Must include assignment work completion, SLA and escalation analytics |
| HospitalManagement | Low/Medium | Needed for facility linkage and referrals |
| CHWAssignments | Critical | Must become the single Admin supervision hub for CHW operational work |

---

## Priority Implementation Plan

## Phase 1 (Immediate)
1. Update CHW Assignments model to include child work items (`TASK`, `HOME_VISIT`).
2. Build Admin CHW Assignments unified work-item view.
3. Wire CHW TasksFollowups and HomeVisits to assignment work items.

## Phase 2
1. Add workflow rules and state machine checks.
2. Add escalation engine for overdue urgent work.
3. Add Admin notifications for CHW assignment events.

## Phase 3
1. Add CHW policy locks from Admin (GPS/sync/check-in).
2. Add assessment-triggered risk flags into assignment work stream.
3. Improve dashboard/reporting around assignment productivity and quality.

## Phase 4 (Cleanup)
1. Restore hidden sidebar links for existing routed pages.
2. Standardize naming across patient and assignment entities.
3. Replace mock in-page data with backend API source of truth.

---

## Final Alignment Decision
To satisfy full oversight requirements:
- CHW Assignments in Admin must own and display both Tasks and Home Visits as unified assignment work categories.
- CHW can execute work, but Admin must always have a real-time governance view and control path for status, escalation, and audit.

This is the single most important structural change to align Admin authority with CHW field operations.
