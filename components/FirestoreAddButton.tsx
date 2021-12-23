import { getFirestore, collection, addDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";

const clickButton = () => {
  const clickButton = () => {
    const id = "003";
    const name = "test";
    const uid = "";
    console.log(id);
    const db = getFirestore();
    const docRef = addDoc(collection(db, "tasks"), {
      uid: uid,
      id: id,
      name: name,
    });
    console.log("Document", docRef);
  };
};

function FirestoreAddButton() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <button onClick={clickButton}>Firestore追加</button>
    </div>
  );
}

export default FirestoreAddButton;
