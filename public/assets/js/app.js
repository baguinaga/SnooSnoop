$.getJSON("/api/r/all", function(data) {
  data.forEach(post => {
    const post_div = $("<div>");
    const post_title = $("<h4>");
    const post_link = $("<p>");

    post_title.text(`${post.title}`);
    post_link.text(`Link: ${post.link}`);
    post_div
      .attr("data-id", post._id)
      .append(post_title)
      .append(post_link);
    $("#results").append(post_div);
  });
});
