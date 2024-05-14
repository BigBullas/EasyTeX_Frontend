import styles from './modules.module.scss';

const CreateMirrorDivElement = (
  textarea: Element,
  textareaContainer: Element,
) => {
  const mirroredEle = document.createElement('div');
  mirroredEle.textContent = textarea.value;
  mirroredEle.classList.add(styles.container__mirror);
  textareaContainer?.prepend(mirroredEle);

  const textareaStyles = window.getComputedStyle(textarea);
  [
    'border',
    'boxSizing',
    'fontFamily',
    'fontSize',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'padding',
    'textDecoration',
    'textIndent',
    'textTransform',
    'whiteSpace',
    'wordSpacing',
    'wordWrap',
  ].forEach((property) => {
    mirroredEle.style[property] = textareaStyles[property];
  });
  mirroredEle.style.borderColor = 'transparent';

  const parseValue = (v) =>
    v.endsWith('px') ? parseInt(v.slice(0, -2), 10) : 0;
  const borderWidth = parseValue(textareaStyles.borderWidth);

  const ro = new ResizeObserver(() => {
    mirroredEle.style.width = `${textarea.clientWidth + 2 * borderWidth}px`;
    mirroredEle.style.height = `${textarea.clientHeight + 2 * borderWidth}px`;
  });
  ro.observe(textarea);

  textarea.addEventListener('scroll', () => {
    mirroredEle.scrollTop = textarea.scrollTop;
  });

  const findSlashCooddinates = () => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const textAfterCursor = textarea.value.substring(cursorPos);

    const pre = document.createTextNode(textBeforeCursor);
    const post = document.createTextNode(textAfterCursor);
    const caretEle = document.createElement('span');
    caretEle.innerHTML = '&nbsp;';

    mirroredEle.innerHTML = '';
    mirroredEle.append(pre, caretEle, post);

    const rect = caretEle.getBoundingClientRect();
    // setPosition({ x: rect.right, y: rect.bottom });
    // setVisible(true);

    return { x: rect.right, y: rect.bottom };
  };

  return () => findSlashCooddinates;
};

export default CreateMirrorDivElement;
