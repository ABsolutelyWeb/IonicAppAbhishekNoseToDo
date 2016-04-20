angular.module("todoList.todostorage", []).factory('TodoStorage', function () {
  var lists = angular.fromJson(window.localStorage['todos'] || '[]'); // When storing data, convert it from Json. If there is no data to be stored, store an empty array.

  function dataStorage () {
  	window.localStorage['todos'] = angular.toJson(lists);
  }

  return {
    todoList: function () {
      return lists;
    },

    getTodo: function (todoID) {
      for (var i=0; i < lists.length; i++) {
        if (lists[i].id === todoID) {
          return lists[i];
        }
      }
      return undefined;
    },

    makeTodo: function (todo) {
      lists.push(todo);
      dataStorage();
    },

    updateTodo: function (todo) {
      for (var i=0; i < lists.length; i++) {
        if (lists[i].id === todo.id) {
          lists[i] = todo;
          dataStorage();
          return;
        }
      }
      return undefined;      
    },

    moveTodo: function (todo, fromIndex, toIndex) {
    	lists.splice(fromIndex, 1); // Remove the item at that position
    	lists.splice(toIndex, 0, todo); // Remove 0 items and insert the new todo placement.
    	dataStorage(); // Save the changes
    },

    deleteTodo: function (todoID) {
		for (var i=0; i < lists.length; i++) {
	        if (lists[i].id === todoID) {
	          lists.splice(i, 1); // Delete one item at the current index.
	          dataStorage(); // Save everything once finished.
	          return;
	        }
      	}    	
    }
  };
});