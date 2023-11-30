const Contact = () => {
    return (
        <section>
            <div className="px-6 mx-auto max-w-screen-md">
                <h2 className="heading text-center">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text__para">
                    Got a technical issue? Want to send feeback about a beat feature? Let us know
                </p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="form__label">
                            Your Email
                        </label>
                        <input className="form__input mt-1" type="email" id="email" placeholder="example@gmail.com" />
                    </div>
                    <div>
                        <label htmlFor="subject" className="form__label">
                            Subject
                        </label>
                        <input
                            className="form__input mt-1"
                            type="text"
                            id="subject"
                            placeholder="Let us know how we can help you"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label">
                            Your Message
                        </label>
                        <textarea
                            className="form__input mt-1"
                            type="text"
                            id="message"
                            placeholder="Leave a comment....."
                            rows="6"
                        />
                    </div>
                    <button type="submit" className="btn sm:w-fit rounded">
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
