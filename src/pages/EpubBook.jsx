import React, { useState } from "react";
import JSZip from "jszip";
import "../css/epub.css"
import Chapter from "./Chapter"
import ButtonSection from "./ButtonSection";
import AlertMessages from "./AlertMessages";
import DeleteAlertMessage from "./DeleteAlertMessage";
const EpubBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [background, setBackground] = useState(false);
  const [margin, setMargin] = useState(false)
  const [addAlert, setAddAlert] = useState (false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [chapters, setChapters] = useState([{ title: "", content: "" }]);
  const [image, setImage] = useState(null);
  console.log(chapters.length)
  const handleOver = () => {
    setBackground(true);
  };
  const handleOut = () => {
    setBackground(false);
  };
  const addNewChapter = () => {
    setChapters([...chapters, { title: "", content: "" }]);
    setMargin(true)
    setAddAlert(true)
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const handleGenerateEPUB = async () => {
    const zip = new JSZip();

    // EPUB metadata
    const packageData = `<?xml version="1.0" encoding="UTF-8"?>
    <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
      <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>${bookTitle}</dc:title>${bookAuthor ? `<dc:creator>${bookAuthor}</dc:creator>` : ""}
        <dc:identifier id="bookid">urn:uuid:1234567890</dc:identifier>
        <dc:language>en</dc:language>
        <meta property="rendition:layout">reflowable</meta>
        <meta property="rendition:spread">auto</meta>
      </metadata>
      <manifest>
        <item id="cover" href="cover.jpg" media-type="image/jpeg" properties="cover-image" />
        <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
        ${chapters
          .map(
            (chapter, index) =>
              `<item id="chapter${index + 1}" href="chapter${
                index + 1
              }.xhtml" media-type="application/xhtml+xml" />`
          )
          .join("\n")}
        <item id="toc" properties="nav" href="toc.xhtml" media-type="application/xhtml+xml" />
      </manifest>
      <spine toc="ncx">
        <itemref idref="cover" linear="no" />
        ${chapters
          .map((chapter, index) => `<itemref idref="chapter${index + 1}" />`)
          .join("\n")}
      </spine>
      <guide>
        <reference type="cover" title="Cover" href="chapter1.xhtml" />
        <reference type="toc" title="Table of Contents" href="toc.xhtml" />
      </guide>
    </package>`;
    // NCX navigation file
    let toc = `<?xml version="1.0" encoding="UTF-8"?>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head> 
      <meta name="dtb:uid" content="urn:uuid:1234567890" />
          <meta name="dtb:depth" content="1" />
          <meta name="dtb:totalPageCount" content="0" />
          <meta name="dtb:maxPageNumber" content="0" />
      </head>
      <docTitle>
          <text>Sample EPUB</text>
        </docTitle>
      <body>
        <h1>Table of Contents</h1>
        <nav xmlns:epub="http://www.idpf.org/2007/ops" epub:type="toc">
          <ol>
            ${chapters
              .map(
                (chapter, index) =>
                  `<li><a href="chapter${index + 1}.xhtml">${
                    chapter.title
                  }</a></li>`
              )
              .join("\n")}
          </ol>
        </nav>
      </body>
    </html>`;
  
    chapters.forEach((chapter, index) => {
      const chapterContent = `
      <?xml version="1.0" encoding="UTF-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <style>
        .chapter p{
          color:#474646;
          font-weight: 600;
        }
        .chapter h1{
          font-weight: 700;
          text-transform: capitalize;
          letter-spacing: 1px;
          font-family: 'Playfair Display', serif;
          font-size: 40px;
        }
        </style>
        </head>
        <body>
          <div class="chapter">
            <h1>${chapter.title}</h1>
            <p>${chapter.content}</p>
          </div>
        </body>
      </html>
    `;
      zip.file(`OEBPS/chapter${index + 1}.xhtml`, chapterContent.trim());
    });

    if (image) {
      zip.file("OEBPS/cover.jpg", image, { base64: true });
    } 
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });
    zip.file(
      "META-INF/container.xml",
      `<?xml version="1.0" ?>
      <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
        <rootfiles>
          <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml" />
        </rootfiles>
      </container>`
    );
    zip.file("OEBPS/package.opf", packageData.trim());
    zip.file("OEBPS/toc.ncx", toc.trim());
    zip.file("OEBPS/toc.xhtml", toc.trim());
  
    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${bookTitle}.epub`;
      a.click();
    });
    return zip.generateAsync({ type: "blob" });
  };
  return (
    <div className="ui">
    <div className="container ">
      <h1 className="text-center fw-bolder ">EPUB GENERATOR</h1>
      {addAlert && (
        <AlertMessages
        setAddAlert={setAddAlert}
         />
      )}
      {deleteAlert && (
        <DeleteAlertMessage
        setDeleteAlert={setDeleteAlert}
        />
      )}
      <div className="row">
        <div className="col-md-8 col-sm-6 m-auto shadow rounded bg-white ps-4 pe-4" style={{height:"90vh" , overflowX: "hidden",overflowY: "auto"}}>
          <div className="row">
            <div className="col-md-4 col-sm-6 mt-5 mb-3">
              <label htmlFor="bookTitle" className="label-control fw-bolder">Enter Book Title</label>
              <input
                type="text"
                name="bookTitle"
                className="form-control fw-semibold"
                placeholder="Book Title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>
            <div className="col-md-4 col-sm-6  mt-5 mb-3">
              <label htmlFor="bookAuthor" className="label-control fw-bolder">Enter Book Author</label>
              <input
                type="text"
                name="bookAuthor"
                className="form-control fw-semibold"
                placeholder="Book Author"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
              />
            </div>
            <div className="mb-3 col-md-4 col-sm-6 mt-5">
            <label htmlFor="image" className="label-control fw-semibold">
             Select an Image 
            </label>
            <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="form-control"
            onChange={handleImageChange}
           />
          </div>
          </div>
          {chapters.map((chapter, index) => (
            <Chapter 
            key={index}
             chapter={chapter}
             index={index}
             chapters={chapters}
             setChapters={setChapters}
             margin={margin}
            />
          ))}
          <ButtonSection 
          background={background}
          setChapters={setChapters}
          setDeleteAlert={setDeleteAlert}
          addNewChapter={addNewChapter}
          handleGenerateEPUB={handleGenerateEPUB}
          handleOut={handleOut}
          handleOver={handleOver}
          chapters={chapters}
          />
        </div>
      </div>
    </div>
   </div>
  );
};

export default EpubBook;
