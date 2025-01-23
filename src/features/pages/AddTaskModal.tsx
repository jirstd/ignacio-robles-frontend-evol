import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../components/Modal';
import { Task } from '../tasks/tasks';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'Ruby',
  'Go',
  'PHP',
  'TypeScript',
  'Swift',
  'Kotlin',
  'Rust',
  'C++',
  'Dart',
];

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      completed: false,
      tags: [] as string[],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, 'El título no puede exceder 50 caracteres')
        .required('El título es obligatorio'),
      description: Yup.string().max(200, 'La descripción no puede exceder 200 caracteres'),
      completed: Yup.boolean(),
      tags: Yup.array().of(Yup.string()),
    }),
    onSubmit: (values) => {
        console.log('values -->', values);
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  const addTag = (tag: string) => {
    if (tag && !formik.values.tags.includes(tag)) {
      formik.setFieldValue('tags', [...formik.values.tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    formik.setFieldValue(
      'tags',
      formik.values.tags.filter((t) => t !== tag)
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="p-6">
        <h2 className="text-lg font-bold mb-4">Agregar Nueva Tarea</h2>

        {/* Campo: Título */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Título"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 ${
                formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
              } text-gray-900`}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        {/* Campo: Descripción */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500'
                  : 'border-gray-300'
              } text-gray-900`}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          )}
        </div>

        {/* Campo: Estado */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">Estado</label>
          <select
            id="completed"
            name="completed"
            value={formik.values.completed ? 'true' : 'false'}
            onChange={(e) => formik.setFieldValue('completed', e.target.value === 'true')}
            onBlur={formik.handleBlur}
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-900`}
          >
            <option value="false">Pendiente</option>
            <option value="true">Completado</option>
          </select>
        </div>

        {/* Campo: Etiquetas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">Etiquetas</label>
          <select
            onChange={(e) => addTag(e.target.value)}
            value=""
            className="border p-2 rounded w-full focus:ring-2 border-gray-300"
          >
            <option value="" disabled>
              Seleccionar Lenguaje
            </option>
            {programmingLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {formik.values.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  type="button"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Guardar
        </button>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
