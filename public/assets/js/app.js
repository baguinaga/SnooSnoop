$.getJSON("/api/r/all", function(data) {
  data.forEach(post => {
    const post_div = $("<div>");
    const post_title = $("<h4>");
    const post_button = $("<button>");
    const post_collapse = $("<div>");
    const post_edit = $("<div>");

    post_title.text(`${post.title}`);

    post_button
      .addClass("btn btn-primary")
      .html(`<i class="fab fa-reddit-alien"></i>`)
      .attr({
        type: "button",
        "data-toggle": "collapse",
        "data-target": `#${post._id}`
      });

    post_edit
      .addClass("card card-body");
        
    post_collapse
      .addClass("collapse")
      .attr("id", `${post._id}`)
      .append(post_edit);
  
    post_div
      .addClass("post_div")
      .append(post_title)
      .append(post_button)
      .append(post_collapse);

    $("#results").append(post_div);
  });
});
