# Online IDE and Judge System

The project aims to provide a basic service of Online Judging System

#### Highlights
1. POST /api/submit
2. GET /api/submissions
3. Core server[right-top terminal here] and microservice(judging environment)[right-bottom terminal here] are all set!
4. 

https://user-images.githubusercontent.com/57654450/132291614-d37b41a2-67d8-4923-8632-d8a9a9ecbbd0.mp4





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
- [x] rabbitMQ setup ready and connected to express server
- [x] mongoDB setup ready and connected to express server
- [ ] Add the judge0 environment to express server
- [ ] cloud bucket (not decided yet) for storing code text
- [ ] ...
