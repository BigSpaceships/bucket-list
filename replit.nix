{ pkgs }: 
{
    deps = [
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x
        pkgs.concurrently

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}