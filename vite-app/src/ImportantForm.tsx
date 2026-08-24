import { useCallback, useState } from "react";
import { type BlockerFunction, useBlocker } from "react-router-dom";

export function ImportantForm() {
  const [value, setValue] = useState("");

  const shouldBlock = useCallback<BlockerFunction>(
    () => value !== "",
    [value]
  );
  const blocker = useBlocker(shouldBlock);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setValue("");
        if (blocker.state === "blocked") {
          blocker.proceed();
        }
      }}
    >
      <input
        name="data"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Save</button>

      {blocker.state === "blocked" ? (
        <>
          <p style={{ color: "red" }}>
            Blocked the last navigation to
          </p>
          <button
            type="button"
            onClick={() => blocker.proceed()}
          >
            Let me through
          </button>
          <button
            type="button"
            onClick={() => blocker.reset()}
          >
            Keep me here
          </button>
        </>
      ) : blocker.state === "proceeding" ? (
        <p style={{ color: "orange" }}>
          Proceeding through blocked navigation
        </p>
      ) : (
        <p style={{ color: "green" }}>
          Blocker is currently unblocked
        </p>
      )}
    </form>
  );
}
