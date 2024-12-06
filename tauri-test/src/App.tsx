import { useEffect, useState } from "react";
import { desktopDir } from "@tauri-apps/api/path";
import { DirEntry, readDir, readTextFile } from "@tauri-apps/plugin-fs";
import { File, Folder, Tree } from "./components/ui/file-tree";
import { Button } from "./components/ui/button";

interface FileEntry extends DirEntry {
  id: string;
  children?: FileEntry[];
  isExpanded?: boolean;
  fullPath: string;
}

function App() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [desktopPath, setDesktopPath] = useState<string>("");
  const [currentDir, setCurrentDir] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>(""); // State for file content

  useEffect(() => {
    async function fetchRootDirectory() {
      const rootDir = await desktopDir();
      setDesktopPath(rootDir);
      setCurrentDir(rootDir);

      const rootFiles = await readDirectory(rootDir);
      setFiles(rootFiles);
    }

    fetchRootDirectory();
  }, []);

  const readDirectory = async (path: string): Promise<FileEntry[]> => {
    const dirEntries = await readDir(path);
    return dirEntries.map((entry, index) => ({
      ...entry,
      id: `${entry.name}-${index}`,
      fullPath: `${path}/${entry.name}`,
      children: entry.isDirectory ? [] : undefined,
      isExpanded: false,
    }));
  };

  const toggleFolder = async (folder: FileEntry) => {
    if (folder.isExpanded) {
      setFiles((prevFiles) =>
        updateFileTree(prevFiles, folder.id, { isExpanded: false })
      );
    } else {
      const children = folder.children?.length
        ? folder.children
        : await readDirectory(folder.fullPath);
      setFiles((prevFiles) =>
        updateFileTree(prevFiles, folder.id, { isExpanded: true, children })
      );
    }
  };

  const updateFileTree = (
    fileTree: FileEntry[],
    folderId: string,
    updates: Partial<FileEntry>
  ): FileEntry[] => {
    return fileTree.map((file) => {
      if (file.id === folderId) {
        return { ...file, ...updates };
      }
      if (file.isDirectory && file.children) {
        return {
          ...file,
          children: updateFileTree(file.children, folderId, updates),
        };
      }
      return file;
    });
  };

  const handleFileClick = async (file: FileEntry) => {
    try {
      const content = await readTextFile(file.fullPath); // Read the file content
      setFileContent(content); // Set content in state
    } catch (error) {
      console.error("Error reading file:", error);
      setFileContent("Failed to read file.");
    }
  };

  const renderTree = (fileEntries: FileEntry[]) => {
    return (
      <Tree>
        {fileEntries.map((file) => (
          <div key={file.id} className="pl-4">
            {file.isDirectory ? (
              <Folder
                onClick={() => toggleFolder(file)}
                element={file.name}
                value={file.name}
              />
            ) : (
              <File value={file.id + file.name} className="bg-gray-800">
                <div
                  onClick={() => handleFileClick(file)} // Attach click handler
                >
                  {file.name}
                </div>
              </File>
            )}
            {file.isExpanded && file.children && renderTree(file.children)}
          </div>
        ))}
      </Tree>
    );
  };

  const goBack = () => {
    setCurrentDir((prev) => {
      const parts = prev.split("/").filter((part) => part);
      if (parts.length > 1) {
        parts.pop();
        return `/${parts.join("/")}`;
      }
      return desktopPath;
    });
  };

  useEffect(() => {
    async function fetchDirectory() {
      const updatedFiles = await readDirectory(currentDir);
      setFiles(updatedFiles);
    }
    fetchDirectory();
  }, [currentDir]);

  return (
    <div className="flex h-screen">
      {/* File Tree Panel */}
      <div className="w-1/3 p-4 text-white bg-gray-900 border-r">
        <div className="mb-2">
          <Button className="px-4 py-2 bg-gray-800 rounded" onClick={goBack}>
            Back
          </Button>
        </div>
        {renderTree(files)}
      </div>

      {/* File Content Panel */}
      <div className="flex-1 p-4 overflow-auto text-white bg-gray-800">
        <h1 className="text-lg font-bold">File Content</h1>
        <pre className="whitespace-pre-wrap">
          {fileContent || "Select a file to view its content."}
        </pre>
      </div>
    </div>
  );
}

export default App;
