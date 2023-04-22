import React from "react";

const AddMessage = () => {
  return (
    <div className=" w-full">
      <Textarea
        label="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <Button onClick={messagHandler} fullWidth className="w-full">
        Add Step
      </Button>
    </div>
  );
};

export default AddMessage;
