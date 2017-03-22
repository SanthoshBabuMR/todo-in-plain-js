var render = function (model) {
  var todosList = $('[data-id="todos-list"]'),
      notificationTimer;

  var renderNotification = function (show, ele) {
    console.info('eventHandler.js > renderNotification');
    var notification = $('[data-id="notification"]');
    if (show === true) {
      notification.html($(ele)).removeClass('hide');
      clearTimeout(notificationTimer);
      notificationTimer = setTimeout(function () {
        notification.html('').addClass('hide')
      }, 5000);
    } else {
      notification.html('').addClass('hide');
    }
  };

  var renderTodos = function () {
    console.info('eventHandler.js > renderTodos');
    var todos = model.get(),
        listItem,
        listItems;
    todosList.empty();

    if (todos.length) {
      listItem = $('#todoListItem').html()
      listItems = todos.map(function(todo) {
        var item = $(listItem).clone();
        item.find('li').attr('data-task-id', todo.id).find('.text').text(todo.task);
        return item.html();
      });
    } else {
      listItems = ['<p>You\'re yet to create any todos</p>'];
    }
    todosList.append(listItems.join(''));
  };

  return {
    notification: renderNotification,
    todos: renderTodos
  };
};

$(function () {
  var model = window.app.model;
  window.app.renderDOM = render(model);
});
