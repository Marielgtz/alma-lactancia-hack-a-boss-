import useInstagramForm from "../hooks/useInstagramForm";
import "./InstagramForm.css";

const InstagramForm = ({ setInstagramPost, setSelectedPostNumber }) => {
  const {
    blockquote,
    setBlockquote,
    postNumber,
    handlePostNumberChange,
    handleSubmit,
    handleDeletePost,
  } = useInstagramForm(setInstagramPost);

  const handlePostChange = (e) => {
    handlePostNumberChange(e);
    setSelectedPostNumber(e.target.value);
  };

  return (
    <form className="instagram-form-container" onSubmit={handleSubmit}>
      <div>
        <p className="texto-descriptivo-accion">
          1. Escoje una publicación vacía o bien cambia una existente:
        </p>
      </div>
      <div className="instagram-form-input-select">
        <select
          className="instagram-form-select"
          name="postNumber"
          onChange={handlePostChange}
          value={postNumber}
          required
        >
          <option value="">Selecciona una publicación</option>
          <option value="1">Publicación 1</option>
          <option value="2">Publicación 2</option>
          <option value="3">Publicación 3</option>
          <option value="4">Publicación 4</option>
          <option value="5">Publicación 5</option>
          <option value="6">Publicación 6</option>
        </select>
      </div>
      <div>
        <p className="texto-descriptivo-accion">
          2. Introduce el código de inserción de la publicación de Instagram que
          quieras publicar:
        </p>
      </div>
      <div className="instagram-form-input-select">
        <input
          className="instagram-form-input"
          type="text"
          required
          value={blockquote}
          onChange={(e) => setBlockquote(e.target.value)}
          placeholder="Introduce el código de inserción de Instagram"
        />
      </div>

      <div className="instagram-form-buttons">
        <button className="instagram-form-button-submit" type="submit">
          <i className="fas fa-upload"></i> Publicar
        </button>
        <button
          className="instagram-form-button-delete"
          onClick={handleDeletePost}
        >
          <i className="fas fa-times"></i> Borrar
        </button>
      </div>
    </form>
  );
};

export default InstagramForm;
