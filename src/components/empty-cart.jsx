const EmptyCart = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <img
        className="mb-6 size-[16rem]"
        src="/not-found.svg"
        alt="Nothing on the cart."
      />
      <p className="text-sm text-muted-foreground">
        Nothing on the cart yet. try adding something.
      </p>
    </div>
  );
};

export default EmptyCart;
