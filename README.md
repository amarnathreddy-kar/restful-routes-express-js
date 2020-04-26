# restful-routes-express-js
RESTful Routes - All Seven RESTful routes [index (GET), new (GET), create (POST), show (GET), edit (GET), update (POST) and destroy (DELETE)]

---------------------------------------------------------------------------------------------------------------------------------------
Name	  |Path	             |HTTP-Verb	    |Purpose	                                                      |Mongoose Method
---------------------------------------------------------------------------------------------------------------------------------------
Index	  /students	          GET	          List all students	                                              student.find()
---------------------------------------------------------------------------------------------------------------------------------------
New	    /students/new	      GET	          Show new student form	                                          N/A
---------------------------------------------------------------------------------------------------------------------------------------
Create	/students	          POST	        Create a new student, then redirect to required route 	        student.create()
---------------------------------------------------------------------------------------------------------------------------------------
Show	  /students/:id	      GET	          Show info about one specific student	                          student.findById()
---------------------------------------------------------------------------------------------------------------------------------------
Edit	  /students/:id/edit	GET	          Show edit form for one student	                                student.findById()
---------------------------------------------------------------------------------------------------------------------------------------
Update	/students/:id	      PUT	          Update particular student, then redirect to required route	    student.findByIdAndUpdate()
---------------------------------------------------------------------------------------------------------------------------------------
Destroy	/students/:id	      DELETE	      Delete a particular student, then redirect to required route	   student.findByIdAndRemove()
---------------------------------------------------------------------------------------------------------------------------------------
