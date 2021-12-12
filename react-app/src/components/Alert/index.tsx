const Alert = (props: any) => {
  return (
    <div>
      <div
        className={`alert alert-${props.type} alert-dismissable fade show`}
        role="alert"
        style = {{position: 'fixed', top: '100px', left: '0', right: '0', zIndex: '9999', margin: 'auto', width: '30%'}}
      >
        {props.message}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Alert;
