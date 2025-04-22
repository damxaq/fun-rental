export function validateGallery(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files;
  if (file && file.length > 10) {
    alert("Too many photos, try maximum of 10 images.");
    event.target.value = "";
  } else if (file) {
    for (const f of file) {
      if (f.size > 10485760) {
        alert(
          "Some of the photos are larger than 10 MB. Please choose a smaller file."
        );
        event.target.value = "";
      }
    }
  }
}
