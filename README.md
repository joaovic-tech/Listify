# To-do list with NodeJS
* Task management app

## Lista de afazeres:

[ ] Criar uma `ul>li` para listar todas as tarefas
[ ] Dentro desses `li's` um form parecido com o de criar uma task
    * Esse form precisar ser criado dinamicamente sem usar o método clone()
    * precisar possuir um ver-mais para ver os detalhes da quela task
    * Fiz um exemplo logo abaixo de como fazer submit de cada form com o mesmo id
    * Lembrando que para pegar os elementos do form utilizar o `this.form`
    * criar uma rota `/edit/:id` isso é o action
    * Quando for criar os dias de repetição da quela task mostrar com o opacidade aquele que está marcado

html:
```html
<ul>
  <li>
    <form id="teste-form">
      <input type="text" name="teste" id="teste">
    </form>
  </li>
  <li>
    <form id="teste-form">
      <input type="text" name="teste" id="teste">
    </form>
  </li>
</ul>
```

js:
```js
class TesteForms {
  constructor(form) {
    this.form = form;
    this.input = this.form.querySelector('#teste');
  }

  init() {
    this.form.style.margin = '2rem';
    const formData = new FormData(this.form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
  }
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  const el = e.target;
  const formsExist = el.id === 'teste-form';

  if (formsExist) {
    const testeForms = new TesteForms(el);
    testeForms.init();
  }
});
```