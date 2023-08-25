import React, { useState } from "react";
import JSZip from "jszip";
import AddIcon from '@mui/icons-material/Add';
const EpubBook = () => {
  const [contentData, setContent] = useState("");
  const [title, setTitle] = useState({
    title: "",
    author: ""
  });
  function handleChange2(e) {
    setTitle({ ...title, [e.target.name]: e.target.value });
  }
  const [background, setBackground] = useState(false);
  function handleOver() {
    setBackground(true);
  }

  function handleOut() {
    setBackground(false);
  }
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleGenerateEPUB = async () => {
    const zip = new JSZip();
    const packageData = `<?xml version="1.0" encoding="UTF-8"?>
    <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
      <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:title>${title.title}</dc:title>
        <dc:creator>${title.author}</dc:creator>
        <dc:identifier id="bookid">urn:uuid:1234567890</dc:identifier>
        <dc:language>en</dc:language>
        <meta property="rendition:layout">reflowable</meta>
      </metadata>
      <manifest>
        <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
        <item id="chapter1" href="chapter1.xhtml" media-type="application/xhtml+xml" />
      </manifest>
      <spine toc="ncx">
        <itemref idref="chapter1" />
      </spine>
      <guide>
        <reference type="cover" title="Cover" href="chapter1.xhtml" />
      </guide>
    </package>`;
      const content = `
      <?xml version="1.0" encoding="UTF-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        </head>
        <body>
        <h1>${title.title}</h1>
        <h2>${title.author}</h2>
          <p>${contentData}</p>
        </body>
      </html>
    `;
    const toc = `<?xml version="1.0" encoding="UTF-8"?>
    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
      <head>
        <meta name="dtb:uid" content="urn:uuid:1234567890" />
        <meta name="dtb:depth" content="1" />
        <meta name="dtb:totalPageCount" content="0" />
        <meta name="dtb:maxPageNumber" content="0" />
      </head>
      <docTitle>
        <text>Sample EPUB</text>
      </docTitle>
      <navMap>
        <navPoint id="navpoint-1" playOrder="1">
          <navLabel>
            <text>Chapter 1</text>
          </navLabel>
          <content src="chapter1.xhtml" />
        </navPoint>
      </navMap>
    </ncx>`;
    
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
    zip.file("OEBPS/chapter1.xhtml", content.trim());
    zip.file("OEBPS/toc.ncx", toc.trim());
    zip.generateAsync({ type: "blob" }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "epub.epub";
      a.click();
        });
    };
  return (
    <div className="container">
      <h1 className="text-center fw-bolder m-3">EPUB GENERATOR</h1>
      <div className="row"> 
        <div className="col-md-7 col-sm-6 m-auto shadow rounded">
        <button
          className="d-flex justify-content-end border-0"
           onMouseOver={handleOver}
           onMouseOut={handleOut}
           style={{
             backgroundColor: background
               ? "rgba(73, 209, 135, 0.8)"
               : "rgba(78, 176, 67, 0.6)"
           }}

          ><AddIcon /></button>
          <div className="row">
            <div className="col-md-6 col-sm-6 mb-3 mt-2">
              <label htmlFor="title" className="label-control fw-semibold">Enter Book Title Here</label>
              <input type="text" name="title" className="form-control fw-semibold" id="title" placeholder="Book Tittle" onChange={handleChange2} />
            </div>
            <div className="col-md-6 col-sm-6 mb-3 mt-2">
              <label htmlFor="author" className="label-control fw-semibold">Enter Author Name Here</label>
              <input type="text" name="author" className="form-control fw-semibold" id="author" placeholder="Author Name" onChange={handleChange2} />
            </div>
          </div>
          <textarea
            className="form-control fw-semibold"
            value={contentData}
            onChange={handleContentChange}
            placeholder="Enter your content here ..."
            rows={10}
            cols={80}
          />
          <div className="row d-grid m-3">
        <div className="col-md-12 col-sm-6 m-auto">
          <button
            onMouseOver={handleOver}
            onMouseOut={handleOut}
            onClick={handleGenerateEPUB}
            style={{
              backgroundColor: background
                ? "rgba(73, 209, 135, 0.8)"
                : "rgba(78, 176, 67, 0.6)"
            }}
            className="btn text-white fw-bolder w-100 rounded-pill"
          >
            GENERATE YOUR OWN EPUB BOOK
          </button>
        </div>
      </div>
        </div>
      </div>
    
    </div>
  );
};

export default EpubBook;
