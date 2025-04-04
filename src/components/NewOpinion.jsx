import { useActionState } from "react";

export function NewOpinion() {
    const [formState, formAction] = useActionState(shareOpinionAction, {errors:null})

    function shareOpinionAction(_, formDate){
        const userName = formDate.get("userName")
        const title = formDate.get("title")
        const body = formDate.get("body")

        const errors = []

        if(!(userName.trim().length > 0)){
            errors.push("Please enter a username.")
        }

        if(title.trim().length < 5){
            errors.push("Title must be atleast 5 characters long.")
        }

        if(body.trim().length < 5 || body.trim().length > 300){
            errors.push("Opinion must be between 5 and 300 characters")
        }

        if(errors.length > 0){
            return {errors, enteredValues:{
                userName,
                title,
                body,
            }}
        }

        return {errors:null}
    }

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

      {formState.errors && <ul className="errors">
          {formState.errors.map((err)=><li key={err}>{err}</li>)}
          </ul>}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
