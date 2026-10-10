const Location = () => {
    return (
        <div className="min-h-screen  bg-white">
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold text-center">
                Is the pin in the right location? 
                </h1>
                <p className="text-center"  >If not, please drag the pin to the correct location.</p>
            <div className="mt-6 flex justify-center rounded-2xl overflow-hidden border border-(--dark-pink)">
                <iframe
                    title="Google Maps"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.974269564487!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580b7b6a5a5a5%3A0x8b6a5a5a5a5a5a5a!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1639999999999"
                    allowFullScreen
                ></iframe>
            </div>

        </div>
        </div>
    )
}

export default Location