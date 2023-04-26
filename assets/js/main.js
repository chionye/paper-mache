const btn = document.querySelector('.search-btn');

btn.addEventListener('click', (e) => {
    const url = $("#url").val();
    e.target.textContent = "Searching...";
    $.ajax({
      type: "post",
      url: "http://localhost:9000/scrape",
      data: {url},
      dataType: "text",
      success: function (response) {
        e.target.textContent = "Search";
        console.log(response);
        $(".input-group").after(`
            <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert">
            ${response}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
      },
    });
});