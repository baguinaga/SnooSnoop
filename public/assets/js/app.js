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

    post_div.addClass("row justify-content-center");

    post_title.addClass("col-11").text(`${post.title}`);

    post_b_div.addClass("col-1").append(post_button);

    post_button
      .addClass("btn btn-primary")
      .html(`<i class="fab fa-reddit-alien"></i>`)
      .attr({
        type: "button",
        "data-toggle": "collapse",
        "data-target": `#collapse-${post._id}`,
        "aria-expanded": "false",
        "aria-controls": `collapse-${post._id}`
      });

    post_collapse
      .addClass("col-7 collapse card")
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
      placeholder: "Note Title"
    });

    p_note_body.addClass("form-control").attr({
      id: `ta-${post._id}`,
      rows: "4",
      placeholder: "Notes"
    });

    p_submit
      .addClass("btn btn-outline-success btn-submit")
      .html(`<i class="far fa-save"></i> Save`)
      .attr({
        type: "button",
        "data-id": `${post._id}`
      });

    p_delete
      .addClass("btn btn-outline-danger btn-delete")
      .html(`<i class="fas fa-trash"></i> Delete`)
      .attr({
        type: "button",
        "data-id": `${post._id}`
      });

    post_div
      .append(post_title)
      .append(post_b_div)
      .append(post_collapse);

    $("#results").append(post_div);
  });
});

$.document.on("click", ".btn-submit", () => {
  const db_note_id = $(this).attr("data-id");
});

{
  /* <input class="form-control" type="text" placeholder="Default input"></input> */
}
