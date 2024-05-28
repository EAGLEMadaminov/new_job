import BookForm from './../../features/dashboard/BookForm';

const CreateBook = () => {
  return (
    <div className="create_container">
      <h1>Create New Book</h1>
      <BookForm data={'create'} />
    </div>
  );
};

export default CreateBook;
