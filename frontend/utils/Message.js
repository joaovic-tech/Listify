export default class Message {
  static create(msg, color) {
    const modalMessageExist = document.getElementById("msg");
    modalMessageExist ? modalMessageExist.remove() : null;

    const body = document.body;
    const modalMessage = document.createElement("span");
    let icon = "";

    if (color === "green") {
      icon = '<i class="fa-solid fa-circle-check"></i>';
    } else if (color === "amber") {
      icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
    } else {
      icon = '<i class="fa-solid fa-circle-exclamation"></i>';
    }

    modalMessage.id = "msg";
    modalMessage.classList.add(
      "fixed",
      "z-50",
      "top-0",
      "left-0",
      "w-full",
      "p-5",
      "transition",
      "duration-500",
      "ease-in-out",
      `text-${color}-500`,
      "flex",
      "gap-2",
      "justify-center",
      "items-center",
      "font-bold",
      "bg-gradient-to-r",
      "from-white",
      "via-gray-200",
      "to-white",
      "dark:bg-gradient-to-r",
      "dark:from-gray-950",
      "dark:via-gray-900",
      "dark:to-gray-950",
      "shadow-md",
      "dark:shadow-gray-900",
      "opacity-0"
    );

    modalMessage.innerHTML = `${icon} ${msg}`;
    body.appendChild(modalMessage);

    const lineAnimation = document.createElement("div");
    lineAnimation.classList.add(
      "absolute",
      "bottom-0",
      "left-0",
      "rounded-full",
      "w-full",
      "h-1",
      `bg-${color}-500`,
      "shadow-md",
      `shadow-${color}-500`
    );
    modalMessage.appendChild(lineAnimation);

    setTimeout(() => {
      modalMessage.classList.remove("opacity-0", "scale-90");
      modalMessage.classList.add("opacity-100", "scale-100");

      lineAnimation.classList.add("line-animate");
    }, 10);

    setTimeout(() => {
      modalMessage.remove();
    }, 3000);
  }
}
