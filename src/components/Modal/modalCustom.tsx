import { Transition } from "@headlessui/react";

import { Dialog } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";

const ModalCustom = ({
  title,
  description,
  textLeft,
  textRight,
  show,
  onClose,
  onSubmit,
}: {
  title: string;
  description: string;
  textLeft: string;
  textRight: string;
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[500]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
                <Dialog.Title className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 text-center mb-4">
                  {description}
                </Dialog.Description>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClose}
                    className="py-2 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                  >
                    {textLeft}
                  </button>
                  <button
                    onClick={onSubmit}
                    className="py-2 rounded-2xl bg-gray-900 text-white font-semibold hover:bg-black transition"
                  >
                    {textRight}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCustom;
