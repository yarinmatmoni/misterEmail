import "./emailFilter.scss";

export const EmailFilter = () => {
  return (
    <form className="email-filter">
      <input
        type="text"
        placeholder="Search mail"
        name="search"
      />
      <div className="checkbox-filter">
        <input type="checkbox" id="all" name="all"></input>
        <label htmlFor="all">All</label>
        <input type="checkbox" id="read" name="read"></input>
        <label htmlFor="read">Read</label>
        <input type="checkbox" id="unread" name="unread"></input>
        <label htmlFor="unread">Unread</label>
      </div>
    </form>
  );
};
