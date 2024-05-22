import React, { useState } from 'react';
import styles from './ChangingImgModal.module.scss';
import { Button, Modal } from 'antd';
// import { fx } from '../../modules/glfx';

console.log(styles);

// type Props = {
//   changeBreadcrump: Function;
// };

const ChangingImgModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function sendFormData(formData: FormData) {
    try {
      const response = await fetch(
        'https://smartlectures.ru/api/v1/preprocessor',
        {
          method: 'POST',
          body: formData,
        },
      );

      const receivedData = await response.json();

      console.log(receivedData);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  }

  // const drawImageOnCanvas = () => {
  //   const canvas = document.getElementById('tutorial');
  //   //@ts-ignore
  //   const ctx = canvas?.getContext('2d');

  //   if (image && image.complete) {
  //     ctx.drawImage(image, 0, 0, 150, 150); // Отрисовываем изображение на холсте
  //   }
  // };

  // const handleChangeInputForContextMenu = async (event: React.ChangeEvent) => {
  //   //@ts-ignore
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append(
  //     'images',
  //     // @ts-ignore
  //     file,
  //   );
  //   // await sendFormData(formData);

  //   // Определение контекста рисования
  //   const canvas = document.getElementById('tutorial');
  //   // @ts-ignore
  //   const context = canvas?.getContext('2d');

  //   context.drawImage(file, 10, 10);

  //   // const file = event.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = function (e) {
  //     const img = new Image();
  //     //@ts-ignore
  //     img.src = e.target.result;
  //     // setImage.src = e.target.result; // Загружаем изображение
  //     if (img && img.complete) {
  //       context.drawImage(img, 0, 0, 150, 150); // Отрисовываем изображение на холсте
  //     }
  //   };
  //   reader.readAsDataURL(file); // Читаем содержимое файла как Data URL
  // };

  const handleChangeInputForContextMenu = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    //@ts-ignore
    const canvas = fx.canvas();
    const canvas_container = document.getElementById('canvas_container');
    canvas.classList.add(styles.preview_canvas);
    if (canvas_container) {
      canvas_container.append(canvas);
    }
    showModal();

    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      //@ts-ignore
      img.src = e.target.result as string; // Устанавливаем src объекта Image
      img.onload = function () {
        const canvas = document.getElementById('tutorial') as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        //@ts-ignore
        canvas.brightnessContrast(-1, 0);
        if (context && img) {
          context.drawImage(img, 0, 0, 300, 300); // Теперь отрисовываем изображение на холсте
        }

        const img_container = document.getElementById('img_container');
        img.classList.add(styles.preview_img);
        img_container?.append(img);
      };
    };
    reader.readAsDataURL(file); // Читаем содержимое файла как Data URL

    const formData = new FormData();
    formData.append(
      'image',
      // @ts-ignore
      file,
    );
    // formData.append('threshold', '0');
    formData.append('apply_fft', 'False');
    await sendFormData(formData);
  };

  return (
    <div>
      <input
        id="input"
        type="file"
        accept=".jpeg,.png,.svg"
        // ref={inputForContextMenuFile}
        // style={{ display: 'none' }}
        onChange={handleChangeInputForContextMenu}
      ></input>

      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div></div>
          <div
            id="img_container"
            style={{ width: '300px', height: '300px' }}
          ></div>
          <div id="canvas_container"></div>
          <img src="example.jpeg"></img>
          <canvas
            id="tutorial"
            width="300"
            height="300"
            style={{ border: '1px solid black' }} // Используйте 'solid' вместо 'black'
          ></canvas>
        </div>
      </Modal>
    </div>
  );
};

export default ChangingImgModal;
