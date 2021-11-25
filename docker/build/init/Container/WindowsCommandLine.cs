using System;
using System.Diagnostics;

namespace Sitecore.Demo.Init.Container
{
    public class WindowsCommandLine
    {
        private readonly string workingDirectory;

        public WindowsCommandLine(string workingDirectory)
        {
            this.workingDirectory = workingDirectory;
        }

        public string Run(string command)
        {
            var cmd = new Process();
            cmd.StartInfo.FileName = "cmd.exe";
            cmd.StartInfo.RedirectStandardInput = true;
            cmd.StartInfo.RedirectStandardOutput = true;
            cmd.StartInfo.RedirectStandardError = true;
            cmd.StartInfo.CreateNoWindow = true;
            cmd.StartInfo.UseShellExecute = false;
            cmd.StartInfo.WorkingDirectory = workingDirectory;
            cmd.Start();

            cmd.StandardInput.WriteLine(command);
            cmd.StandardInput.Flush();
            cmd.StandardInput.Close();
            var output = cmd.StandardOutput.ReadToEnd();
            output += cmd.StandardError.ReadToEnd();
            cmd.WaitForExit();

            output += cmd.StandardOutput.ReadToEnd();
            output += cmd.StandardError.ReadToEnd();
            Console.WriteLine(output);
            return output;
        }
    }
}
