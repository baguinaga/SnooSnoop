$.getJSON("/api/r/all", function(data) {
  data.forEach(post => {
    const post_div = $("<div>");
    const post_title = $("<h4>");
    const post_b_div = $("<div>");
    const post_button = $("<button>");
    const post_collapse = $("<form>");
    const post_edit = $("<div>");
    const p_note_title = $("<input>");
    const p_note_body = $("<textarea>");
    const p_submit = $("<button>");
    const p_delete = $("<button>");

    post_div.addClass("row px-4 justify-content-center");

    post_title.addClass("col-11 post_title").text(`${post.title}`);

    post_b_div.addClass("col-1 d-flex align-items-center").append(post_button);

    post_button
      .addClass("btn btn-primary btn-collapse")
      .html(`<i class="fab fa-reddit-alien"></i>`)
      .attr({
        type: "button",
        "data-toggle": "collapse",
        "data-id": `${post._id}`,
        "data-target": `#collapse-${post._id}`,
        "aria-expanded": "false",
        "aria-controls": `collapse-${post._id}`
      });

    post_collapse
      .addClass("col-6 collapse card")
      .attr("id", `collapse-${post._id}`)
      .append(post_edit);

    post_edit
      .addClass("row justify-content-end card-body")
      .append(p_note_title)
      .append(p_note_body)
      .append(p_delete)
      .append(p_submit);

    p_note_title.addClass("form-control").attr({
      type: "text",
      id: `title-${post._id}`,
      placeholder: "Title"
    });

    p_note_body.addClass("form-control my-2").attr({
      id: `body-${post._id}`,
      rows: "4",
      placeholder: "Note Text"
    });

    p_submit
      .addClass("btn btn-outline-success btn-submit")
      .html(`<i class="far fa-save"></i> Save`)
      .attr({
        type: "button",
        "data-id": `${post._id}`,
        "data-role": "submit"
      });

    p_delete
      .addClass("btn btn-outline-danger btn-submit")
      .html(`<i class="fas fa-trash"></i> Delete`)
      .attr({
        type: "button",
        "data-id": `${post._id}`,
        "data-role": "delete"
      });

    post_div
      .append(post_title)
      .append(post_b_div)
      .append(post_collapse);

    $("#results").append(post_div);
  });
});

$(document).on("click", ".btn-submit", function() {
  const db_post_id = $(this).attr("data-id");

  const data =
    $(this).attr("data-role") === "submit"
      ? {
          title: $(`#title-${db_post_id}`).val(),
          body: $(`#body-${db_post_id}`).val()
        }
      : {
          title: "",
          body: ""
        };

  $.post(`/api/posts/${db_post_id}`, data).then(data => {
    console.log(data);
    $(`#collapse-${db_post_id}`)
      .each(function() {
        this.reset();
      })
      .collapse("toggle");
  });
});

$(document).on("click", ".btn-collapse", function() {
  const db_post_id = $(this).attr("data-id");
  $.get(`/api/posts/${db_post_id}`, data => {
    console.log(data);
    if (data.note) {
      $(`#title-${db_post_id}`).val(data.note.title);
      $(`#body-${db_post_id}`).val(data.note.body);
    }
  });
});

$("#sr_search").on("click", function(event) {
  event.preventdefault();
  console.log("working");
});