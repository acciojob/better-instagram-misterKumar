window.onload = function() {
  let divs = document.querySelectorAll('.image');
  for (let i = 0; i < divs.length; i++) {
    divs[i].setAttribute('id', 'div' + (i + 1));
    divs[i].addEventListener("dragstart", handleDragStart, false);
    divs[i].addEventListener("dragover", handleDragOver, false);
    divs[i].addEventListener("drop", handleDrop, false);
  }
}

let dragSrcEl = null;

function handleDragStart(e) {
  
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    let parent = document.querySelector('#parent');
    let srcIndex = Array.prototype.indexOf.call(parent.children, dragSrcEl);
    let targetIndex = Array.prototype.indexOf.call(parent.children, this);
    if (srcIndex < targetIndex) {
      parent.insertBefore(dragSrcEl, this.nextSibling);
      parent.insertBefore(this, parent.children[srcIndex]);
    } else {
      parent.insertBefore(this, dragSrcEl);
      parent.insertBefore(dragSrcEl, parent.children[targetIndex]);
    }
  }
  return false;
}