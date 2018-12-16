//Querying the database  with select
SELECT name FROM students;
SELECT * FROM teachers;
//department  column contains the foreign key to departments ID
/* foreign key, referencing the id column (which is a uniquely identifying primary key) */
SELECT * FROM teachers;
SELECT * FROM departments;

//filtering rows with where
SELECT name FROM students WHERE name != 'naomi';
SELECT name, department FROM teachers WHERE id > 2 OR name = 'fred';

//where pattern matching with like
SELECT id, name FROM students WHERE name LIKE '%m';
SELECT * FROM students WHERE name NOT LIKE '%a%';

//limiting where to a defined set with in
// WHERE name = 'pamela' OR name = 'sunny';
SELECT name FROM teachers WHERE id NOT IN (1,2,4);
SELECT name FROM teachers WHERE department IN (1,4);

//using in to compose subquieres
SELECT name, id FROM teachers WHERE department IN 
(SELECT id FROM departments WHERE name = 'psy');

SELECT name FROM departments WHERE id IN 
(SELECT department FROM teachers WHERE name = 'sunny');

//selecting from multiple tables
//you can choose specific columns from multiple tables
SELECT departments.id, classes.id FROM departments, classes;
//we will have all items in the id columns from both tables in dep & classes
SELECT students.*, teachers.name FROM students, teachers;
//select all columns from students table and another column containing all the teachers name

/* but an important insight --> since there are no relationship we are duplicating 
all teacher names per student >> ineffecient
*/

//advanced filtering
//Display the name and id of all the teachers in the 'psy' department
SELECT teachers.name, teachers.id FROM  teachers, departments 
    WHERE departments.name = 'psy' AND  teachers.department = departments.id;
//Display the name of the department that 'sunny' teaches for 
SELECT departments.name FROM departments, teachers 
    WHERE teachers.name  =  'sunny'  AND departments.id = teachers.department;

//inner join
//they are the same
// --- Display the name and id of all the teachers in the 'psy' department  -----
SELECT teachers.id, teachers.name FROM teachers 
    INNER JOIN departments ON departments.name = 'psy' AND teachers.department = departments.id;
//Display the name of the department that 'sunny' teaches for 
SELECT departments.name FROM departments 
    INNER JOIN teachers ON teachers.name = 'sunny' AND departments.id = teachers.department;

//other joins
//left outer join vs right outer join vs full outer join
/* The LEFT OUTER JOIN will return all the same information as an inner join, but will 
also return all entries from the first table in the query, even the ones that don't meet the ON condition.*/
SELECT teachers.name FROM teachers LEFT OUTER JOIN departments
  ON departments.name = "cs" AND teachers.department = departments.id;
//the right outer join on sqlite
SELECT teachers.name FROM departments LEFT OUTER JOIN teachers
  ON departments.name = "cs" AND teachers.department = departments.id;

/*  knowing the difference from one to one relationship  vs many to one  relationship */
/* when we want to support a many to many relationship between two tables, we create a third table, often referred
 to as a join table (or sometime junction table) that contains foreign keys referencing each of the other 2 tables.*/

 //Which classes is 'sam' taking
 SELECT classes.name FROM classes 
    INNER JOIN students, classes_students 
    ON  students.name = 'sam'
    AND classes_students.student_id = students.id 
    AND classes.id = classes_students.classes_id;
    //ans: communication class

 //What are the names of the students in the 'compromise' class?
 SELECT students.name  FROM students INNER JOIN classes, classes_students 
    ON classes.name = 'compromise'
    AND classes_students.classes_id  = classes.id
    AND students.id = classes_students.student_id;
    //naomi,chris,kim

 //What are the names of the students taking any class in the 'cs' department?
 SELECT students.name FROM students INNER JOIN departments, classes, classes_students
    ON departments.name = 'cs'
    AND classes.department = departments.id
    AND classes_students.classes_id  = classes.id
    AND students.id = classes_students.student_id;
//only got lauren, dan, dan, naomi,kim,chris >> why 2 dan??


