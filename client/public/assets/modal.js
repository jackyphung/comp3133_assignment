const modal = $(".modal");
const showModal = (modalId) => {
  modal.attr("id", modalId).addClass('show');
}

const hideModal = (modalId) => {
  modal.attr("id", modalId).removeClass('show');
}

modal.click((e) => {
  $(e.target).removeClass("show");
});