(function () {

var app = angular.module('todoList', ['ionic', 'todoList.todostorage']);

app.config (function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('todo', {
    url: '/todo',
    templateUrl: 'views/todo.html'
  });

  $stateProvider.state('editTodo', {
    url: '/editTodo/:todoID',
    templateUrl: 'views/editTodo.html',
    controller: 'TodoEditCtrl'
  });  

  $stateProvider.state('addTodo', {
    url: '/addTodo',
    templateUrl: 'views/editTodo.html',
    controller: 'TodoAddCtrl'
  });
  
  $urlRouterProvider.otherwise('/todo');
});

app.controller("ToDoCtrl", function ($scope, TodoStorage) {
  $scope.rearrange = false;
  $scope.list = TodoStorage.todoList();

  $scope.deleteTodo = function (todoID) {
    TodoStorage.deleteTodo(todoID);
  };

  $scope.moveTodo = function (todo, fromIndex, toIndex) {
    TodoStorage.moveTodo(todo, fromIndex, toIndex);
  };

  $scope.toggleMove = function () {
    $scope.rearrange = !$scope.rearrange;
  };
});


app.controller("TodoEditCtrl", function ($scope, $state, TodoStorage) {
  $scope.todo = angular.copy(TodoStorage.getTodo($state.params.todoID)); // Create a copy of the edit, but don't save untless the user specifies to save.
  $scope.saveChanges = function () {
    TodoStorage.updateTodo($scope.todo);
    $state.go('todo');
  };
});


app.controller("TodoAddCtrl", function ($scope, $state, TodoStorage) {
  $scope.todo = {
    id: new Date().getTime().toString(),
    title: '',
    content: ''
  };

  $scope.saveChanges = function () {
    TodoStorage.makeTodo($scope.todo);
    $state.go('todo');
  };
});


app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

}());