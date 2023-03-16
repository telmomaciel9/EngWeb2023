
exports.tasksPage =  function(tasks, task=null){
    pagHTML = `
    <!DOCTYPE html>
    <html>  
        <head>
            <meta charset="utf-8"/>
            <title>TPC4 - To Do List</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/> 
        </head>
        <body>
            <div>
                <header class="w3-container w3-purple">
                    <h1>TPC4 - To Do List</h1>
                </header>
    
                <div class="w3-container">
                    <h3>Add Taks</h3>
                </div>

                <form class="w3-container" method="POST">
    `

    if(task==null){
        pagHTML += `

                    <label>Id</label>
		            <input class="w3-input" name="id" value="${tasks.length}" readonly/>

                    <label>Due Date</label>
                    <input class="w3-input" name="dueDate" type="date"/>

                    <label>Author</label>
                    <input class="w3-input" name="author"/>

                    <label>Task Description</label>
                    <input class="w3-input" name="taskDescription"/>

        `
    }  
    else{
        pagHTML += `
                    <label>Id</label>
		            <input class="w3-input" name="id" value="${task.id}" readonly/>

                    <label>Due Date</label>
                    <input class="w3-input" name="dueDate" value="${task.dueDate}" type="date"/>

                    <label>Author</label>
                    <input class="w3-input" name="author" value="${task.author}"/>

                    <label>Task Description</label>
                    <input class="w3-input" name="taskDescription" value="${task.taskDescription}"/>

                    `
    }
    

    pagHTML += `
                    <button class="w3-btn w3-purple w3-round" type="submit">Register</button>
			    </form>
		    </div>

		    <div>
		    	<div class="w3-card w3-half w3-border-right">
		    		<div class="w3-container">
		    			<h3>Due Tasks</h3>
		    		</div>

		    		<table class="w3-table-all">
		    			<tr>
		    				<th>Id</th>
		    				<th>Author</th>
		    				<th>Due Date</th>
		    				<th>Task Description</th>
		    				<th>Actions</th>
		    			</tr>
    `

    for(i=0; i<tasks.length; i++){
        if(tasks[i].estado=="aFazer"){
            var task = tasks[i]

            pagHTML += `
                        <tr>
                            <td>${task.id}</td>
                            <td>${task.author}</td>
                            <td>${task.dueDate}</td>
                            <td>${task.taskDescription}</td>
                            <td>

                                <a href="http://localhost:7777/edit/${task.id}">
                                    [Edit]
                                </a>
                                
                                <a href="http://localhost:7777/done/${task.id}">
                                    [Done]
                                </a>
                            </td>
                        </tr>
            `
        }
    }

    pagHTML += `
                    </table>
			    </div>

			    <div class="w3-card w3-half w3-border-left">
			    	<div class="w3-container">
			    		<h3>Done Tasks</h3>
			    	</div>

			    		<table class="w3-table-all">
			    			<tr>
			    				<th>Id</th>
			    				<th>Author</th>
			    				<th>Due Date</th>
			    				<th>Description</th>
			    			</tr>
    `

    for(i=0; i<tasks.length; i++){
        if(tasks[i].estado=="completa"){
            var task = tasks[i]

            pagHTML += `
                            <tr>
                                <td>${task.id}</td>
                                <td>${task.author}</td>
                                <td>${task.dueDate}</td>
                                <td>${task.taskDescription}</td>
                            </tr>
            `
        }
    }


    pagHTML += `
                        </table>

    			</div>
                <footer class="w3-container w3-blue">
                    <h5>Generated in EngWeb2023</h5>
                </footer>
    		</div>
    	</body>
    </html> 
    `

    return pagHTML
}