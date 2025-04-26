import { useEffect } from 'react';

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

export const sendNotification = (title, body) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: '/favicon.ico'
    });
  }
};

export const checkDueTodos = (todos) => {
  const now = new Date();
  todos.forEach(todo => {
    if (todo.dueDate && !todo.completed) {
      const dueDate = new Date(todo.dueDate);
      const timeDiff = dueDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);

      // Notify if due within 24 hours
      if (hoursDiff > 0 && hoursDiff <= 24) {
        sendNotification(
          "Todo Due Soon!",
          `"${todo.title}" is due in ${Math.round(hoursDiff)} hours`
        );
      }
    }
  });
};

export const useNotifications = (todos) => {
  useEffect(() => {
    const checkPermissionAndSetup = async () => {
      const hasPermission = await requestNotificationPermission();
      if (hasPermission) {
        // Check todos every hour
        const interval = setInterval(() => {
          checkDueTodos(todos);
        }, 3600000); // 1 hour

        return () => clearInterval(interval);
      }
    };

    checkPermissionAndSetup();
  }, [todos]);
};