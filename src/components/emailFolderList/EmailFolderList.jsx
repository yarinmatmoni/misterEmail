import "./emailFolderList.scss";

export const EmailFolderList = () => {

const onCompose = () => {
  console.log('compose');
}

  return (
    <div className="email-folder-list">
      <div className="email-compose-btn">
        <button onClick={onCompose}>Compose</button>
      </div>
      <div className="folder-list">
      </div>
    </div>
  );
};
