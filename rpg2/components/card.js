const card = document.getElementById('card-container');

card.innerHTML = `
  <div class="bg-white shadow rounded-lg p-4 max-w-sm mx-auto">
    <div class="font-bold text-lg mb-2">Card Title</div>
    <p>This is a simple card built with Tailwind.</p>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Action
    </button>
  </div>
`;
