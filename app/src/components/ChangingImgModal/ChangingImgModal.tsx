import React from 'react';
import styles from './CustomBreadcrumb.module.scss';

console.log(styles);

// type Props = {
//   changeBreadcrump: Function;
// };

const ChangingImgModal: React.FC = () => {
  // async function sendFormData(formData: FormData) {
  //   try {
  //     const response = await fetch(
  //       'https://smartlectures.ru/api/v1/images/upload',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       },
  //     );

  //     const receivedData = await response.json();

  //     let currentText = noteText;
  //     if (cursorPosition == currentText?.length) {
  //       currentText += `  ![image](${receivedData.src})`;
  //     } else {
  //       currentText =
  //         currentText?.substring(0, cursorPosition) +
  //         `  ![image](${receivedData.src})` +
  //         currentText?.substring(cursorPosition, currentText.length);
  //     }
  //     setNoteText(currentText);
  //     setNote((note: Note) => {
  //       note.body = String(currentText);
  //       return note;
  //     });
  //   } catch (error) {
  //     console.error('There was a problem with your fetch operation:', error);
  //   }
  // }

  // const handleChangeInputForContextMenu = async (event: React.ChangeEvent) => {
  //   const formData = new FormData();
  //   formData.append(
  //     currentKeyContextMenu === 'addImage' ? 'image' : 'images',
  //     // @ts-ignore
  //     event.target.files[0],
  //   );
  //   await sendFormData(formData);
  // };

  return (
    <div>
      {/* <input
        type="file"
        accept=".jpeg,.png,.svg"
        // ref={inputForContextMenuFile}
        // style={{ display: 'none' }}
        onChange={handleChangeInputForContextMenu}
      ></input> */}
    </div>
  );
};

export default ChangingImgModal;
