#load nuget:https://www.myget.org/F/cake-contrib?package=Cake.Wyam.Recipe&version=0.9.0-unstable0005&prerelease

Environment.SetVariableNames();

BuildParameters.SetParameters(context: Context,
                            buildSystem: BuildSystem,
                            title: "Aberdeen Developers .Net User Group",
                            repositoryOwner: "adnuguk",
                            repositoryName: "adnuguk.github.io",
                            appVeyorAccountName: "adnuguk",
                            webHost: "aberdeendevelopers.co.uk",
                            shouldPurgeCloudflareCache: true,
                            masterBranchName: "source");

BuildParameters.PrintParameters(Context);

Build.Run();
