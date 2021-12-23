function Welcome(props: { name: string }) {
  console.log(props.name);
  return <h1>Hello, {props.name}</h1>;
}

function About() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

export default About;
