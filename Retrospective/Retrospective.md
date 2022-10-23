TEMPLATE FOR RETROSPECTIVE (Team 1)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 3 stories committed vs. 2 stories done 
- Total of 9 points committed vs. 6 points done 
- 48 of hours planned (8 for each team member) vs. 34 hours spent (as a team)

Definition of Done:
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _User-Select the service type_    |   _4_   |  _3_   |   _3d_     |    _3d 2h 35m_    |
| _Officer-Call next client_    |   _5_   | _3_    |    _1d_   |  _7h 40m_      |

### Tasks statistics
##### User-Select the service type
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _Database for the services_  |  _1h_  |  _1d 2h_  |
| _Website layout_   |  _2h_  | _2h 30m_   |
| _Rest API_  | _2h_   | _6h 35m_   |
| _Queue logic_  |  _2h_  | _7h 40m_   |

##### Officer-Call next client
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _Update queues_   |  _2h_  | _1h 40m_   |
| _Implement button to call next client_  | _2h_   | _2h_   |
| _Remove the previous client_  |  _2h_  | _2h_   |
| _Select the next client in the queue_  |  _2h_  | _1h_   |
| _Implement login functionality_  |  _2h_  |  _2h_  |

- Hours per task average: (estimate)1.89 (actual)3.89, (actual)2.88 (estimate and actual)

- ##### Table for estimate standard deviation
| Group | Frequency |
|------|------------|
|_1h_|  _1_ |
| _2h_  | _8_ |

standard deviation: (estimate)0.031

- ##### Table for actual standard deviation
| Group | Frequency |
|------|------------|
|_1h-3h_|  _6_ |
| _6h-10h_  | _3_ |

standard deviation: (actual)2.68

- Total task estimation error ratio: (1 + $8\times2$) / (10 + $4\times2$ + 6 + 7 + $2\times1$) - 1 = -0.48

-------------- TODO -----------
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases 
  - Coverage (if available)

| Task| Total hours estimated | Total hours spent | #UnitTests |
|------|------------|-----|----|
| Update Queues| 1h30m-2h | 1h 30m | 9 |
| Officer Call next client  | 1h30m -2h | 1h 30m | 5 |
| Rest API | 2h | 2h 20m | ---- |


File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|---------------------------------------------
All files    |   66.07 |     40.9 |   77.77 |   68.22 | 
 DB.js       |   82.41 |       50 |     100 |    87.2 | 108-109,120-121,132-133,144-145,159,176,191
 Queue.js    |   61.01 |       40 |   72.72 |   60.34 | 59,88,101,113,122-132,139-150
 Services.js |      50 |    31.81 |   53.33 |   51.42 | 5-13,20-28,39-40,53,62-69,79,92,111-118    

- E2E testing:
  - Total hours estimated: 3h 
  - Total hours spent: 2h
- Code review 
  - Total hours estimated: 2h 
  - Total hours spent: 1h30m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?  
In many cases, we took longer than expected to solve tasks. Initially we had to quickly review the use of javascript and react and the testing part. Then we had some database management issues that we had to fix in order to continue. Also 

- What lessons did you learn (both positive and negative) in this sprint?  
We learned that working together can be really useful, in particular working in pairs to divide the work and test the parts implemented by the other person. But with the division of tasks we did, there were times when one person's work depended on what needed to be done by another; this made us slow down.

- Which improvement goals set in the previous retrospective were you able to achieve? _Not necessary now_
  
- Which ones you were not able to achieve? Why? _Not necessary now_

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)  
Improve subdivision of tasks  
Better management of time related to testing  
More meeting in order to talk and understand where the problems of each of us are  


- One thing you are proud of as a Team!!  
We were able to agree on the technology to be used and on how to carry out and implement the project
