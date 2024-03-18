const ErrorComponent = ({ text }: { text: string }) => {
  return (
    <div className=" bg-error text-white w-full text-center align-middle leading-10">
      خطای {text}
    </div>
  );
};

export default ErrorComponent;
