import React from 'react';
import { AlertCircle } from 'react-feather';

const DeleteStoryAlert = (props: any) => {
  if (!props.isOpened) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto z-20 bg-black1 bg-opacity-20"
      onClick={props.onClose}
    >
      {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
      <div
        className="flex flex-col items-center bg-white h-96 w-80 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertCircle className="w-14 h-14 text-red1 mt-12 mb-7" />
        <h2 className="text-xl mb-16">
          ストーリーを削除して
          <br />
          よろしいですか？
        </h2>
        <button className="w-4/5 bg-red1 py-2 mb-3 rounded-xl text-white">
          削除
        </button>
        <button
          className="w-4/5 bg-black3 py-2 rounded-xl"
          onClick={props.onClose}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default DeleteStoryAlert;
