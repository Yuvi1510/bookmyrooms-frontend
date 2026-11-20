const Edit = (title, description) => {
    return (
        <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold text-(--ink) mb-6">Edit Listing Details</h2>
                        <div className="space-y-4 bg-white p-6 rounded-xl border">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input type="text" defaultValue={title} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea defaultValue={description} rows={4} className="w-full p-2 border rounded-lg"></textarea>
                            </div>
                            <Button className="bg-(--dark-pink) hover:bg-(--dark-pink-hover) text-white w-full sm:w-auto">
                                Save Changes
                            </Button>
                        </div>
                    </div>
    )
}
export default Edit