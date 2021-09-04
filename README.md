# Online IDE and Judge System

The project aims to provide a basic service of Online Judging System

#### Plan (as of now) [System Perspective]
1. Code is uploaded and stored in cloud storage and its metadeta is stored in database alongside
2. Submission Event is added to submission queue.
3. The **judging environment** then recieves the code (present in front of queue) to be executed.
4. Output of **judging environment** is updated to database.
  - * - * _judging environment is judge0 (rapidAPI) right now_

#### Basic User Expectations
1. Once the code is uploaded user recieves the acknowledgment of successful submission event.
2. While the code is in submission queue user should see the 'in queue' status.
3. While the code is being executed user wants to see the 'processing' as status.
4. After the execution user wants to see the verdict of submission.


![](/plan.png)


Todo list
- [x] Basic Judging environment and code editor using monaco in ReactJS
- [ ] Adding Navigation Page to User for various submissions
- [ ] mongoDB for submission event details and verdict status
- [ ] cloud bucket (not decided yet) for storing code text
- [ ] Apache Kafka as message queue (submission queue)
