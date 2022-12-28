# To-do list with NodeJS
* Task management app

formulário gerado pelo chatGPT

```html
<form id="task-form" class="flex flex-col items-center justify-center p-4" method="post">
  <label class="text-xl font-bold" for="task">Task:</label>
  <input class="border rounded w-full py-2 px-3" type="text" id="task" name="task" required>

  <div class="flex items-center mt-4">
    <input type="checkbox" class="form-checkbox h-6 w-6 text-indigo-600" id="important" name="important">
    <label class="ml-2 text-xl font-bold" for="important">Mark as important</label>
  </div>

  <label class="text-xl font-bold mt-4" for="hours">Hours:</label>
  <input class="border rounded w-full py-2 px-3" type="number" id="hours" name="hours">

  <div class="flex items-center mt-4">
    <input type="checkbox" class="form-checkbox h-6 w-6 text-indigo-600" id="repeat" name="repeat">
    <label class="ml-2 text-xl font-bold" for="repeat">Repeat</label>
  </div>

  <label class="text-xl font-bold mt-4" for="reminder">Reminder:</label>
  <input class="border rounded w-full py-2 px-3" type="text" id="reminder" name="reminder">

  <label class="text-xl font-bold mt-4" for="conclusion">Conclusion:</label>
  <input class="border rounded w-full py-2 px-3" type="text" id="conclusion" name="conclusion">

  <button class="bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-4" type="submit">Submit</button>
</form>
```
