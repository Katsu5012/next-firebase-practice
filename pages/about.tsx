function Welcome(props: { name: string }) {
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
